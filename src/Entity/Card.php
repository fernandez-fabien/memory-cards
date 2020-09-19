<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CardRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=CardRepository::class)
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"cards_read", "boxes_read"}
 *  }
 * )
 * @ApiFilter(SearchFilter::class, properties={"box.title", "nextAt"})
 */
class Card
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"cards_read", "boxes_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"cards_read", "boxes_read"})
     */
    private $recto;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"cards_read", "boxes_read"})
     */
    private $verso;

    /**
     * @ORM\Column(type="string", length=5)
     * @Groups({"cards_read", "boxes_read"})
     */
    private $face;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"cards_read", "boxes_read"})
     */
    private $compartment;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"cards_read", "boxes_read"})
     */
    private $nextAt;

    /**
     * @ORM\ManyToOne(targetEntity=Box::class, inversedBy="card")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"cards_read"})
     */
    private $box;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRecto(): ?string
    {
        return $this->recto;
    }

    public function setRecto(string $recto): self
    {
        $this->recto = $recto;

        return $this;
    }

    public function getVerso(): ?string
    {
        return $this->verso;
    }

    public function setVerso(string $verso): self
    {
        $this->verso = $verso;

        return $this;
    }

    public function getFace(): ?string
    {
        return $this->face;
    }

    public function setFace(string $face): self
    {
        $this->face = $face;

        return $this;
    }

    public function getCompartment(): ?int
    {
        return $this->compartment;
    }

    public function setCompartment(int $compartment): self
    {
        $this->compartment = $compartment;

        return $this;
    }

    public function getNextAt(): ?\DateTimeInterface
    {
        return $this->nextAt;
    }

    public function setNextAt(\DateTimeInterface $nextAt): self
    {
        $this->nextAt = $nextAt;

        return $this;
    }

    public function getBox(): ?Box
    {
        return $this->box;
    }

    public function setBox(?Box $box): self
    {
        $this->box = $box;

        return $this;
    }
}
